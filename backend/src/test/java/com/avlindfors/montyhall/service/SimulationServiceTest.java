package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;
import static com.avlindfors.montyhall.domain.api.Strategy.SWAP;
import static com.avlindfors.montyhall.util.SimulationTestUtil.createRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.domain.api.Strategy;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class SimulationServiceTest {

  private final SimulationService simulationService;
  private final GameManagerService gameManagerService;
  public SimulationServiceTest() {
    gameManagerService = Mockito.mock(GameManagerService.class);
    this.simulationService = new SimulationService(gameManagerService);
  }

  @Test
  public void winOnStickIfFirstPickIsTheCorrectDoor() {
    // Test that we win if we stick to our choice when our first pick is correct
    doReturn(2)
        .when(gameManagerService)
        .getRandomDoorIndex();
    SimulationResponse response = createSingleSimulationWithStratey(STICK);
    assertWin(response);
  }

  @Test
  public void loseOnStickIfFirstPickIsNotTheCorrectDoor() {
    // Test that we lose if we stick to our choice when our first pick is wrong
    doReturn(2)
        .doReturn(1)
        .when(gameManagerService)
        .getRandomDoorIndex();
    SimulationResponse response = createSingleSimulationWithStratey(STICK);
    assertLoss(response);
  }

  @Test
  public void winOnSwapIfFirstPickIsNotTheCorrectDoor() {
    // Test that we win if we swap our choice when our first pick is wrong
    doReturn(2)
        .doReturn(1)
        .when(gameManagerService)
        .getRandomDoorIndex();
    SimulationResponse response = createSingleSimulationWithStratey(SWAP);
    assertWin(response);
  }

  @Test
  public void loseOnSwapIfFirstPickIsTheCorrectDoor() {
    // Test that we lose if we swap our choice when our first pick is correct
    doReturn(2)
        .doReturn(2)
        .when(gameManagerService)
        .getRandomDoorIndex();
    SimulationResponse response = createSingleSimulationWithStratey(SWAP);
    assertLoss(response);
  }

  private void assertWin(SimulationResponse response) {
    assertNumberOfWins(response, 1);
  }

  private void assertLoss(SimulationResponse response) {
    assertNumberOfWins(response, 0);
  }

  private void assertNumberOfWins(SimulationResponse response, int numberOfWins) {
    assertThat(response.getTotalSimulations()).isEqualTo(1);
    assertThat(response.getTotalWins()).isEqualTo(numberOfWins);
  }

  private SimulationResponse createSingleSimulationWithStratey(Strategy strategy) {
    SimulationRequest request = createRequest(1, strategy);
    return simulationService.simulate(request);
  }
}
