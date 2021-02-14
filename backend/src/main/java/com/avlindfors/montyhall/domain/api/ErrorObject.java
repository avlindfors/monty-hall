package com.avlindfors.montyhall.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(builder = ErrorObject.Builder.class)
public class ErrorObject {

  private final ErrorCode code;
  private final String description;

  private ErrorObject(Builder builder) {
    code = builder.code;
    description = builder.description;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  public ErrorCode getCode() {
    return code;
  }

  public String getDescription() {
    return description;
  }

  @Override
  public String toString() {
    return "ErrorObject{"
        + "code=" + code
        + ", description='" + description + '\''
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private ErrorCode code;
    private String description;

    private Builder() {
    }

    public Builder withCode(ErrorCode code) {
      this.code = code;
      return this;
    }

    public Builder withDescription(String description) {
      this.description = description;
      return this;
    }

    public ErrorObject build() {
      return new ErrorObject(this);
    }
  }
}
