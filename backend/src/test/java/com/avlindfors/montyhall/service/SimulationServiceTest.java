package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;
import static com.avlindfors.montyhall.domain.api.Strategy.SWAP;
import static com.avlindfors.montyhall.util.SimulationTestUtil.createRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.domain.api.Strategy;
import org.junit.jupiter.api.DisplayName;
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
  @DisplayName("win if STICK when first pick is correct")
  public void winOnStickIfFirstPickIsTheCorrectDoor() {
    setupGame(2, 2);
    SimulationResponse response = createSingleSimulationWithStratey(STICK);
    assertWin(response);
  }

  @Test
  @DisplayName("lose if STICK when first pick is wrong")
  public void loseOnStickIfFirstPickIsNotTheCorrectDoor() {
    setupGame(2, 1);
    SimulationResponse response = createSingleSimulationWithStratey(STICK);
    assertLoss(response);
  }

  @Test
  @DisplayName("win if SWAP when first pick is wrong")
  public void winOnSwapIfFirstPickIsNotTheCorrectDoor() {
    setupGame(2, 1);
    SimulationResponse response = createSingleSimulationWithStratey(SWAP);
    assertWin(response);
  }

  @Test
  @DisplayName("lose if SWAP when our first pick is correct")
  public void loseOnSwapIfFirstPickIsTheCorrectDoor() {
    setupGame(2, 2);
    SimulationResponse response = createSingleSimulationWithStratey(SWAP);
    assertLoss(response);
  }

  private void setupGame(int carDoor, int pickedDoor) {
    doReturn(carDoor)
        .doReturn(pickedDoor)
        .when(gameManagerService)
        .getRandomDoorIndex();
  }

  private SimulationResponse createSingleSimulationWithStratey(Strategy strategy) {
    SimulationRequest request = createRequest(1, strategy);
    return simulationService.simulate(request);
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
}
