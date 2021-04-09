import * as Yup from 'yup';


export function ValidationSchema()  {

    const addRecipeSchema = Yup.object({
        title: Yup.string().required("First Name should be required please"),
        servings: Yup.number().required("Servings should be required please"),
        preparation: Yup.string().required("Preparation should be required please"),
        ingredients: Yup.string().required("Ingredients should be required please"),
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
            .max(30)
            .min(4)
            .required("Password is required"),
      });

    const signUpSchema = Yup.object({
        email: Yup.string().required("Email is required").email('Email must be in the correct format (test@test.com)' ),
        password: Yup.string()
            .max(30)
            .min(4)
            .required("Password is required"),
        confirmPassword: Yup.string()
            .max(30)
            .min(4)
            .required("Confirm Password is required"),
        name: Yup.string()
            .max(30)
            .min(4)
            .required("Name is required"),
    });

    const forgotPasswordSchema = Yup.object({
        email: Yup.string().required("Email is required").email('Email must be in the correct format (test@test.com)' ),
    });


    return {addRecipeSchema, loginSchema, signUpSchema, forgotPasswordSchema}
}

  export default ValidationSchema;
