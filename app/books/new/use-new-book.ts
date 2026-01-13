 "use client";
 
import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import { useCreateBook, createBookSchema, type CreateBookFormData } from '@/domains/books';
 import { useToast } from '@/shared/ui';
 import { useRouter } from 'next/navigation';
 import { BOOK_CATEGORIES } from '@/core';
 import { ROUTES } from '@/core';
 
 export function useNewBook() {
   const router = useRouter();
   const { mutate: createBook, isPending } = useCreateBook();
   const { addToast } = useToast();
 
   const {
     register,
     handleSubmit,
     formState: { errors },
     watch,
   } = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema) as Resolver<CreateBookFormData>,
  });

  const onSubmit: SubmitHandler<CreateBookFormData> = (data) => {
     createBook(data, {
       onSuccess: () => {
         addToast('Book created successfully!', 'success');
         router.push(ROUTES.MY_BOOKS);
       },
       onError: (error) => {
         addToast(error.message || 'Failed to create book', 'error');
       },
     });
   };
 
   const routerBack = () => router.back();
 
   return {
     register,
     handleSubmit,
     errors,
     isPending,
     categories: BOOK_CATEGORIES,
     onSubmit,
     routerBack,
     watch,
   };
 }
