import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { LoginForm } from 'features/login-form';
import { RegisterForm } from 'features/register-form';
import { RestorePasswordForm } from 'features/restore-password-form';
import React, { Fragment, useState } from 'react';

enum LoginForms {
  LOGIN = 1,
  SIGNUP = 2,
  RESTORE = 3,
}

export type LoginContentProps = {
  onLoginSuccess?: () => void;
}

export const LoginContent = ({ }: LoginContentProps) => {
  const [showingForm, setShowingForm] = useState(LoginForms.LOGIN);

  const showLoginForm = () => {
    setShowingForm(LoginForms.LOGIN)
  }

  const showRestorePasswordForm = () => {
    setShowingForm(LoginForms.RESTORE)
  }

  const showSignUpForm = () => {
    setShowingForm(LoginForms.SIGNUP)
  }

  const formsToShow = {
    [LoginForms.LOGIN]: (
      <LoginForm
        onRestorePasswordClick={showRestorePasswordForm}
        onSignUpClick={showSignUpForm}
      />
    ),
    [LoginForms.SIGNUP]: <RegisterForm />,
    [LoginForms.RESTORE]: <RestorePasswordForm />,
  };

  return (
    <Fragment>
      {
        showingForm !== LoginForms.LOGIN && (
          <Button
            color="secondary"
            sx={{
              alignSelf: 'flex-start',
              borderRadius: 0,
            }}
            variant="text"
            startIcon={<ArrowBack />}
            onClick={showLoginForm}
          >
            LOGIN
          </Button>
        )
      }
      {
        formsToShow[showingForm]
      }
    </Fragment>
  );
}
