"use client"


import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { z } from "zod";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


const formSchema = z.object({

    name: z.string().trim().min(1,{
        message:"O nome é obrigatório e precisa de, ao menos, uma letra!"
    }),
    amount: z.string().trim().min(1,{
        message:"Você precisa especificar a quantia dessa transação"
    }),
    type: z.nativeEnum(TransactionType,{
        message:"Você deve fornecer o tipo da transação!"
    }),
    category: z.nativeEnum(TransactionCategory,{
        required_error:"Você precisa informar a categoria da transação!"
    }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod,{
        required_error:"Por favor, informe o método de pagamento."
    }),
    date: z.date({
    required_error:"Por favor, informe a data da transação."
    }), 
     
 

})


const AddTransactionsButton = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), 
        defaultValues:{
            amount: "",
            category: TransactionCategory.OTHER,
            date: new Date(),
            name: "",
            paymentMethod: TransactionPaymentMethod.CASH,
            type: TransactionType.EXPENSE,

        
        
        },


    });

    const onSubmit = () => {

    }
    return ( 
        <Dialog>
            <DialogTrigger asChild>
            <Button className="rounded-full font-bold">
                Adicionar transação<ArrowDownUpIcon />
            </Button>
             </DialogTrigger>
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                    Adicionar Transação
                    </DialogTitle>
                    <DialogDescription>
                    Insira as informações abaixo:
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>
                <DialogFooter>
                    
                    <Button type="submit">
                        Adicionar
                    </Button><Button variant="outline">
                        Cancelar
                    </Button>
                </DialogFooter>

             </DialogContent>
        </Dialog>



     );
}
  
export default AddTransactionsButton;