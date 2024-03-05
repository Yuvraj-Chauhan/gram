import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

// const registerSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   password: yup.string().required("required"),
//   location: yup.string().required("required"),
//   occupation: yup.string().required("required"),
//   picture: yup.string().required("required"),
// });
// const registerSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   password: yup
//       .string()
//       .required("required")
//       .min(8, "Password must be at least 8 characters long")
//       .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//           "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
//       ),
//   location: yup.string().required("required"),
//   occupation: yup.string().required("required"),
//   picture: yup.string().required("required"),
// });
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
      .string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
          /^(?=.*[a-z])/,
          'Password must include at least one lowercase letter'
      )
      .matches(
          /^(?=.*[A-Z])/,
          'Password must include at least one uppercase letter'
      )
      .matches(
          /^(?=.*\d)/,
          'Password must include at least one digit'
      )
      .matches(
          /^(?=.*[@$!%*?&])/,
          'Password must include at least one special character'
      ),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  picture: yup.string().required("Required"),
});


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // const [loginError, setLoginError] = useState("");

  const register = async (values, onSubmitProps) => {
    // gửi form bao gồm hình ảnh
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      alert("Register successfully!");
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(values);
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      console.log(loggedIn.token);
      navigate("/home");
    }
  };

  // const login = async (values, onSubmitProps) => {
  //     try {
  //         const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify(values),
  //         });

  //         const loggedIn = await loggedInResponse.json();

  //         if (loggedIn.error) {
  //             // Handle login failure
  //             alert("Invalid email or password. Please check your credentials and try again.");
  //         } else {
  //             dispatch(
  //                 setLogin({
  //                     user: loggedIn.user,
  //                     token: loggedIn.token,
  //                 })
  //             );
  //             navigate("/home");
  //         }
  //     } catch (error) {
  //         console.error("Error during login:", error);
  //     } finally {
  //         onSubmitProps.resetForm();
  //     }
  // };
  // const login = async (values, onSubmitProps) => {
  //   try {
  //     const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values),
  //     });

  //     const loggedIn = await loggedInResponse.json();

  //     if (loggedIn.error) {
  //       // Handle login failure
  //       alert("Invalid email or password. Please check your credentials and try again.");
  //     } else {
  //       dispatch(
  //         setLogin({
  //           user: loggedIn.user,
  //           token: loggedIn.token,
  //         })
  //       );
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   } finally {
  //     onSubmitProps.resetForm();
  //   }
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="32px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="4px"
                  padding="16px"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        // border={`1px dashed ${palette.primary.main}`}
                        padding="0 16px"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add your profile picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            {/* <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            /> */}
            <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
            />
            
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "32px 0",
                padding: "16px",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here!"
                : "Already have an account? Log in here!"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default Form;
  // return (
  //   <Formik
  //     onSubmit={handleFormSubmit}
  //     initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
  //     validationSchema={isLogin ? loginSchema : registerSchema}
  //   >
  //     {({
  //       values,
  //       errors,
  //       touched,
  //       handleBlur,
  //       handleChange,
  //       handleSubmit,
  //       setFieldValue,
  //       resetForm,
  //     }) => (
  //       <form onSubmit={handleSubmit}>
  //         <Box
  //           display="grid"
  //           gap="32px"
  //           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
  //           sx={{
  //             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
  //           }}
  //         >
  //           {isRegister && (
  //             <>
  //               <TextField
  //                 label="First Name"
  //                 onBlur={handleBlur}
  //                 onChange={handleChange}
  //                 value={values.firstName}
  //                 name="firstName"
  //                 error={Boolean(touched.firstName) && Boolean(errors.firstName)}
  //                 helperText={touched.firstName && errors.firstName}
  //                 sx={{ gridColumn: "span 2" }}
  //               />
  //               <TextField
  //                 label="Last Name"
  //                 onBlur={handleBlur}
  //                 onChange={handleChange}
  //                 value={values.lastName}
  //                 name="lastName"
  //                 error={Boolean(touched.lastName) && Boolean(errors.lastName)}
  //                 helperText={touched.lastName && errors.lastName}
  //                 sx={{ gridColumn: "span 2" }}
  //               />
  //               <TextField
  //                 label="Location"
  //                 onBlur={handleBlur}
  //                 onChange={handleChange}
  //                 value={values.location}
  //                 name="location"
  //                 error={Boolean(touched.location) && Boolean(errors.location)}
  //                 helperText={touched.location && errors.location}
  //                 sx={{ gridColumn: "span 4" }}
  //               />
  //               <TextField
  //                 label="Occupation"
  //                 onBlur={handleBlur}
  //                 onChange={handleChange}
  //                 value={values.occupation}
  //                 name="occupation"
  //                 error={Boolean(touched.occupation) && Boolean(errors.occupation)}
  //                 helperText={touched.occupation && errors.occupation}
  //                 sx={{ gridColumn: "span 4" }}
  //               />
  //               <Box
  //                 gridColumn="span 4"
  //                 border={`1px solid ${palette.neutral.medium}`}
  //                 borderRadius="4px"
  //                 padding="16px"
  //               >
  //                 <Dropzone
  //                   acceptedFiles=".jpg,.jpeg,.png"
  //                   multiple={false}
  //                   onDrop={(acceptedFiles) =>
  //                     setFieldValue("picture", acceptedFiles[0])
  //                   }
  //                 >
  //                   {({ getRootProps, getInputProps }) => (
  //                     <Box
  //                       {...getRootProps()}
  //                       padding="0 16px"
  //                       sx={{ "&:hover": { cursor: "pointer" } }}
  //                     >
  //                       <input {...getInputProps()} />
  //                       {!values.picture ? (
  //                         <p>Add your profile picture</p>
  //                       ) : (
  //                         <FlexBetween>
  //                           <Typography>{values.picture.name}</Typography>
  //                           <EditOutlinedIcon />
  //                         </FlexBetween>
  //                       )}
  //                     </Box>
  //                   )}
  //                 </Dropzone>
  //               </Box>
  //             </>
  //           )}

  //           <TextField
  //             label="Email"
  //             onBlur={handleBlur}
  //             onChange={handleChange}
  //             value={values.email}
  //             name="email"
  //             error={Boolean(touched.email) && Boolean(errors.email)}
  //             helperText={touched.email && errors.email}
  //             sx={{ gridColumn: "span 4" }}
  //           />

  //           <TextField
  //             label="Password"
  //             type="password"
  //             onBlur={handleBlur}
  //             onChange={handleChange}
  //             value={values.password}
  //             name="password"
  //             error={Boolean(touched.password) && Boolean(errors.password)}
  //             helperText={touched.password && errors.password}
  //             sx={{ gridColumn: "span 4" }}
  //           />

  //           {isLogin && loginError && (
  //             <Typography color="error" sx={{ gridColumn: "span 4" }}>
  //               {loginError}
  //             </Typography>
  //           )}
  //         </Box>

  //         {/* BUTTONS */}
  //         <Box>
  //           <Button
  //             fullWidth
  //             type="submit"
  //             sx={{
  //               margin: "32px 0",
  //               padding: "16px",
  //               backgroundColor: palette.primary.main,
  //               color: palette.background.alt,
  //               "&:hover": { color: palette.primary.main },
  //             }}
  //           >
  //             {isLogin ? "LOGIN" : "REGISTER"}
  //           </Button>
  //           <Typography
  //             onClick={() => {
  //               setPageType(isLogin ? "register" : "login");
  //               resetForm();
  //               setLoginError(""); // Clear login error when switching between login and register
  //             }}
  //             sx={{
  //               textDecoration: "underline",
  //               color: palette.primary.main,
  //               "&:hover": {
  //                 cursor: "pointer",
  //                 color: palette.primary.dark,
  //               },
  //             }}
  //           >
  //             {isLogin
  //               ? "Don't have an account? Sign up here!"
  //               : "Already have an account? Log in here!"}
  //           </Typography>
  //         </Box>
  //       </form>
  //     )}
  //   </Formik>
  // ); 
// };
