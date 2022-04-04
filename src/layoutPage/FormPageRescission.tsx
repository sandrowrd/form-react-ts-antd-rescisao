import ContainerIdentify from "../containers/containersCommonFile/containerIdentify";
import ContainerEmployee from "../containers/containersCommonFile/containeEmployee";
import ContainerRecission from "../containers/containersRescission/containerRecission";
import ContainerObservation from "../containers/containersCommonFile/containerObservation";
import ContainerStability from "../containers/containersRescission/containerStability";
import ContainerAnalyzeRH from "../containers/containersRescission/containerAnalyzeRH";
import ContainerBenefits from "../containers/containersRescission/containerBenefits";
import ContainerRemuneration from "../containers/containersRescission/containerRemuneration";
import ContainerFundsRHRescission from "../containers/containersRescission/containerFundsRHRescission";

export default function FormPageRescission() {
  return (
    <>
      <div>
        <ContainerIdentify />
        <ContainerEmployee />
        <ContainerStability />
        <ContainerRecission />
        <ContainerAnalyzeRH />
        <ContainerBenefits />
        <ContainerRemuneration />
        <ContainerFundsRHRescission />
        <ContainerObservation />
      </div>
    </>
  );
}
