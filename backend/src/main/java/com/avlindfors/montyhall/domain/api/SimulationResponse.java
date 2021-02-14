package com.avlindfors.montyhall.domain.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.validation.constraints.NotNull;

@JsonDeserialize(builder = SimulationResponse.Builder.class)
public class SimulationResponse {

  @NotNull
  private final Integer totalSimulations;

  @NotNull
  private final Integer totalWins;

  private SimulationResponse(Builder builder) {
    totalSimulations = builder.totalSimulations;
    totalWins = builder.totalWins;
  }

  public static Builder newBuilder() {
    return new Builder();
  }

  public int getTotalSimulations() {
    return totalSimulations;
  }

  public int getTotalWins() {
    return totalWins;
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  public static final class Builder {
    private int totalSimulations;
    private int totalWins;

    private Builder() {
    }

    public Builder withTotalSimulations(int totalSimulations) {
      this.totalSimulations = totalSimulations;
      return this;
    }

    public Builder withTotalWins(int totalWins) {
      this.totalWins = totalWins;
      return this;
    }

    public SimulationResponse build() {
      return new SimulationResponse(this);
    }
  }
}
