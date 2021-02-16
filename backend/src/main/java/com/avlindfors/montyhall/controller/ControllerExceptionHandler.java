package com.avlindfors.montyhall.controller;

import static com.avlindfors.montyhall.domain.api.ErrorCode.INTERNAL_SERVER_ERROR;
import static com.avlindfors.montyhall.domain.api.ErrorCode.PARAMETER_VALIDATION_ERROR;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.avlindfors.montyhall.domain.api.ErrorCode;
import com.avlindfors.montyhall.domain.api.ErrorObject;

import java.util.stream.Collectors;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    String allMessages = ex.getBindingResult().getAllErrors().stream()
        .map(this::createErrorObjectMessage)
        .collect(Collectors.joining(", "));

    ErrorObject errorObject = createErrorData(PARAMETER_VALIDATION_ERROR, allMessages);
    return handleExceptionInternal(ex, errorObject, headers, status, request);
  }

  /**
   * Handle {@link RuntimeException} and create error object.
   */
  @ExceptionHandler(value = RuntimeException.class)
  public ResponseEntity<Object> handleRuntimeException(RuntimeException e, WebRequest request) {
    ErrorObject errorData = createErrorData(INTERNAL_SERVER_ERROR, e.getMessage());
    return handleExceptionInternal(e, errorData, new HttpHeaders(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  /**
   * Handle {@link ConstraintViolationException} and create error object.
   */
  @ExceptionHandler({ConstraintViolationException.class})
  @ResponseStatus(BAD_REQUEST)
  public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex,
      WebRequest request) {
    ErrorObject errorData = createErrorData(PARAMETER_VALIDATION_ERROR, ex.getMessage());
    return handleExceptionInternal(ex, errorData, new HttpHeaders(), BAD_REQUEST, request);
  }

  private String createErrorObjectMessage(ObjectError objectError) {
    if (objectError instanceof FieldError) {
      FieldError fieldError = (FieldError) objectError;
      return String.format("%s: %s", fieldError.getField(), objectError.getDefaultMessage());
    }
    return String.format("%s: %s", objectError.getObjectName(), objectError.getDefaultMessage());
  }

  private ErrorObject createErrorData(ErrorCode code, String description) {
    return ErrorObject.newBuilder()
        .withCode(code)
        .withDescription(description)
        .build();
  }
}
