package com.avlindfors.montyhall.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@JsonDeserialize(builder = SimulationRequest.Builder.class)
public class SimulationRequest {

  @NotNull
  @Min(1)
  @Max(Integer.MAX_VALUE)
  private final Integer numberOfSimulations;

  @NotNull
  private final Strategy stickOrSwapStrategy;

  private SimulationRequest(Builder builder) {
    numberOfSimulations = builder.numberOfSimulations;
    stickOrSwapStrategy = builder.stickOrSwapStrategy;
  }

  public Integer getNumberOfSimulations() {
    return numberOfSimulations;
  }

  public Strategy getStickOrSwapStrategy() {
    return stickOrSwapStrategy;
  }

  public Builder newBuilder() {
    return new Builder();
  }

  @Override
  public String toString() {
    return "SimulationRequest{"
        + "numberOfSimulations=" + numberOfSimulations
        + ", stickOrSwapStrategy=" + stickOrSwapStrategy
        + '}';
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private Integer numberOfSimulations;
    private Strategy stickOrSwapStrategy;

    private Builder() {
    }

    public Builder withNumberOfSimulations(Integer numberOfSimulations) {
      this.numberOfSimulations = numberOfSimulations;
      return this;
    }

    public Builder withStickOrSwapStrategy(Strategy stickOrSwapStrategy) {
      this.stickOrSwapStrategy = stickOrSwapStrategy;
      return this;
    }

    public SimulationRequest build() {
      return new SimulationRequest(this);
    }
  }
}
