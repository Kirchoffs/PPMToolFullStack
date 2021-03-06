package com.proj.ppmtool.validator;

import com.proj.ppmtool.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    @Override
    public boolean supports(Class<?> objClass) {
        return User.class.equals(objClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User)object;

        if (user.getPassword().length() < 6) {
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }
    }
}
