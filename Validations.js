import { body } from 'express-validator';

export const loginValidation=[
   body('email','Неправильний формат адреси').isEmail(),
   body('password','Пароль має містити мінімум 6 символів').isLength({min: 6}),
];

export const registerValidation=[
   body('email','Неправильний формат адреси').isEmail(),
   body('password','Пароль має містити мінімум 6 символів').isLength({min: 6}),
   body('fullName',"Ваше ім'я").isLength({min: 3}),
   body('avatarUrl','Неправильне посилання на фото').optional().isURL(),
];

export const postCreateValidation=[
   body('title','Введіть заголовок статті').isLength({min: 3}).isString(),
   body('text','Введіть текст статті').isLength({min: 5}).isString(),
   body('tags',"Неправильний формат тегів (вкажіть масив)").optional().isString(),
   body('imageUrl','Неправильне посилання на фото').optional().isString(),
];