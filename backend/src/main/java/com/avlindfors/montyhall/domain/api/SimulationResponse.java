package com.avlindfors.montyhall.domain.api;

public class SimulationResponse {

  private final int totalSimulations;

  private final int totalWins;

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
