<script lang="ts">
  import { onMount } from "svelte";

  const getCurrentPositionWrap = (options?: PositionOptions) =>
    new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );

  let isLoading = false;

  import { getWeatherData } from "./lib/weather/providers/OpenMeteo";
  import type { WeatherResult } from "./lib/weather/type";
  import { Question } from "./lib/weather/util";

  onMount(async () => {
    let position = await getCurrentPositionWrap();

    isLoading = true;

    let data = await getWeatherData(
      position.coords.latitude,
      position.coords.longitude
    );
    result = data;
  });

  let result: WeatherResult<any>;
</script>

<main>
  <h1>Is it raining?</h1>

  {#if result}
    <div>
      {Question(result).isIt.raining}
    </div>
    <div>Temperature: {result.temperature}</div>
  {:else}
    <button class:loading={isLoading} disabled={isLoading}
      >{isLoading ? "Hold on..." : "Rain Check"}</button
    >{/if}
</main>

<style>
  .isLoading {
  }
</style>
