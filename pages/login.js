import { ConnectWallet } from "@thirdweb-dev/react";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "@/utils/schemas";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { login } from "@/slices/auth";
import { useToast, Spinner } from "@chakra-ui/react";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, error } = useSelector((state) => state.auth);

  const submitData = (data) => {
    dispatch(login(data.formData)).then(() => {
      location.href = "/";
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={"sm"} />
      </div>
    );
  }

  if (error) {
    return toast({
      title: "An error occurred.",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <div className="flex h-screen">
      <div className="w-full m-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src="/logo.png" alt="logo" className="w-auto h-12 mx-auto" />
          <h1 className="text-xl font-bold text-center text-gray-900 uppercase">
            Admin
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white border-2 border-purple-500 shadow sm:rounded-lg sm:px-10">
            <Form
              schema={loginSchema}
              onSubmit={submitData}
              validator={validator}
              liveValidate
            />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <ConnectWallet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
