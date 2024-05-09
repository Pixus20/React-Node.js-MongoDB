import { body } from 'express-validator';

export const registerValidation=[
   body('email','Неправильний формат адреси').isEmail(),
   body('password','Пароль має містити мінімум 6 символів').isLength({min: 6}),
   body('fullName',"Ваше ім'я").isLength({min: 3}),
   body('avatarUrl','Неправильне посилання на фото').optional().isURL(),
];