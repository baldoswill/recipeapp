import * as Yup from 'yup';


export function ValidationSchema()  {

    const addRecipeSchema = Yup.object({
        title: Yup.string().required("First Name should be required please")
            .max(30, 'Title should not exceed 30 characters')
            .min(4, 'Title should not be less than 4 characters'),
        servings: Yup.number().required("Servings should be required please"),
        preparation: Yup.string().required("Preparation should be required please")
            .min(4, 'Preparation should not be less than 4 characters'),
        ingredients: Yup.string().required("Ingredients should be required please")
            .min(4, 'Ingredients should not be less than 4 characters'),
        time: Yup.number().required("Time should be required please"),
        picture:  Yup
        .mixed()
        .required("You need to provide a file")
        .test("fileSize", "The file is too large", (value) => {
            return value && value.size <= 2000000;
        })
        .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp", (value) => {
            return value && (
                value.type === "image/jpeg" ||
                value.type === "image/bmp" ||
                value.type === "image/png" 
                // value.type === 'application/pdf' ||
                // value.type === "application/msword"
            );
        }),
         
      });

      const loginSchema = Yup.object({
        email: Yup.string().required("Email is required").email('Email must be in the correct format (test@test.com)' ),
        password: Yup.string()
            .min(4, 'Password should not be less than 4 characters')
            .required("Password is required"),
      });

    const signUpSchema = Yup.object({
        email: Yup.string().required("Email is required").email('Email must be in the correct format (test@test.com)' ),
        password: Yup.string()
            .required("Password is required")
            .min(4, 'Password should not be less than 4 characters'),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .min(4, 'Confirm Password should not be less than 4 characters')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name: Yup.string()
            .required("Name is required")
            .max(30, 'Name should not exceed 30 characters')
            .min(3, 'Name should not be less than 3 characters')
    });

    const forgotPasswordSchema = Yup.object({
        email: Yup.string().required("Email is required").email('Email must be in the correct format (test@test.com)' ),
    });


    return {addRecipeSchema, loginSchema, signUpSchema, forgotPasswordSchema}
}

  export default ValidationSchema;
