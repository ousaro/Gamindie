package com.ousaro.gamindie.handler;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ousaro.gamindie.exeption.OperationNotPermittedException;

import jakarta.mail.MessagingException;

@RestControllerAdvice // This annotation is used to handle exceptions globally in the application.
public class GlobalExceptionHandler {

    @ExceptionHandler(LockedException.class) // this annotation is used to handle a specific exception
    public ResponseEntity<ExceptionResponse> handleException(LockedException exp) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        ExceptionResponse.builder()
                            .businessErrorCode(BusinessErrorCodes.ACCOUNT_LOCKED.getCode())
                            .businessExceptionDescription(BusinessErrorCodes.ACCOUNT_LOCKED.getDescription())
                            .error(exp.getMessage())
                            .build()
                        );
        
    }


    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        ExceptionResponse.builder()
                            .businessErrorCode(BusinessErrorCodes.ACCOUNT_DISABLED.getCode())
                            .businessExceptionDescription(BusinessErrorCodes.ACCOUNT_DISABLED.getDescription())
                            .error(exp.getMessage())
                            .build()
                        );
        
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        ExceptionResponse.builder()
                            .businessErrorCode(BusinessErrorCodes.BAD_CREDENTIALS.getCode())
                            .businessExceptionDescription(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                            .error(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                            .build()
                        );
        
    }


    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException exp) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                        ExceptionResponse.builder()
                            .error(exp.getMessage())
                            .build()
                        );
        
    }

    @ExceptionHandler(OperationNotPermittedException.class)
    public ResponseEntity<ExceptionResponse> handleException(OperationNotPermittedException exp) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                        ExceptionResponse.builder()
                            .error(exp.getMessage())
                            .build()
                        );
        
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp) {
            Set<String> errors = new HashSet<>();
            exp.getBindingResult().getFieldErrors() // getbindingResult() returns the errors that were found during the validation and getFieldErrors() returns the field errors
            .forEach(error -> {
                var errorsMessage = error.getDefaultMessage();
                errors.add(errorsMessage);
            });
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                        ExceptionResponse.builder()
                            .validationErrors(errors)
                            .build()
                        );
        
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
           // log the exception
            exp.printStackTrace(); // this will print the stack trace of the exception
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                        ExceptionResponse.builder()
                            .businessExceptionDescription("Internal server error, please contact the administrator")
                            .error(exp.getMessage())
                            .build()
                        );
        
    }
    
}
