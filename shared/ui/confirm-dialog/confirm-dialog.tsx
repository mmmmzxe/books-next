 'use client';
 
 import { Button } from '../button/button';
 
 type ConfirmDialogProps = {
   open: boolean;
   title?: string;
   description?: string;
   confirmText?: string;
   cancelText?: string;
   onConfirm: () => void;
   onCancel: () => void;
 };
 
 export function ConfirmDialog({
   open,
   title = 'Confirm Action',
   description = 'Are you sure you want to proceed?',
   confirmText = 'Confirm',
   cancelText = 'Cancel',
   onConfirm,
   onCancel,
 }: ConfirmDialogProps) {
   if (!open) return null;
 
   return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
       <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
         <h3 className="mb-2 text-lg font-semibold text-[#222222]">{title}</h3>
         <p className="mb-4 text-sm text-[#7A7A7A]">{description}</p>
         <div className="flex justify-end gap-3">
           <Button variant="outline" onClick={onCancel}>
             {cancelText}
           </Button>
           <Button variant="danger" onClick={onConfirm}>
             {confirmText}
           </Button>
         </div>
       </div>
     </div>
   );
 }
