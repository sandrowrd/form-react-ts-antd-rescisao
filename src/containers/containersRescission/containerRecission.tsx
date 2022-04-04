import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Upload,
  Button,
  Switch,
  Tooltip,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../containersCommonFile/container.css";
import { useState } from "react";
import { FieldData } from "../containersCommonFile/containerInterface";

var arrayCausa = [""];

arrayCausa = [
  "Inic.Empresa c/ Justa Causa",
  "Inic.Empresa s/ Justa Causa",
  "Inic.Empregado c/ Justa Causa",
  "Inic.Empregado s/ Justa Causa",
  "Culpa Reciproca",
  "Transferencia p/ Outra Empresa",
  "Transferencia p/ Outra Filial",
  "Morte",
  "Morte - Acidente Trabalho",
  "Morte - Doenca Profissional",
  "Abandono de Emprego",
  "Fim do Contrato de Trabalho",
  "Fim Antecipado C.T.- Empresa",
  "Fim Antecipado C.T.- Empregado",
  "Extinção da Empresa",
  "Apos.Tempo Servico c/ Rescisao",
  "Apos.Tempo Servico s/ Rescisao",
  "Apos.p/ idade c/ Rescisao",
  "Apos.p/ idade s/ Rescisao",
  "Apos.p/ Invalidez - Ac.Trabalh",
  "Apos.p/ Invalidez - Doenca Pro",
  "Apos.p/ Invalidez - Outras",
  "Aposentadoria Compulsória",
  "Transferência por Sucessão",
  "Transferência por Sucessão",
  "Transferencia p/ Filial c/Onus",
];

const TypeWarning = [
  "Indenizado",
  "Trabalhado",
  "Trabalhado + Acréscimo",
  "Reavido",
  "Reavido Dispensado",
  "Trabalhado(Rural)",
  "Acordo Mútuo Indenizado",
  "Acordo Mútuo Trabalhado",
];

const dias = [1];
for (let i = 2; i < 31; i++) {
  dias.push(i);
}

let upFields = [
  { name: ["rescissionCause"], value: "" },
  { name: ["warningType"], value: "" },
  { name: ["warningDate"], value: "" },
  { name: ["dismissalDate"], value: "" },
  { name: ["paymentDate"], value: "" },
  { name: ["numDayWork"], value: "" },
  { name: ["compSaturday"], value: false },
  { name: ["fufillWork"], value: false },
  { name: ["hiredOtherCompany"], value: false },
  { name: ["vacancyReplace"], value: false },
];

export default function ContainerRecission() {
  const [fields, setFields] = useState<FieldData[]>(upFields);

  const [form] = Form.useForm();
  const [tooltip, setTooltip] = useState("");

  const certificateCauseDead =
    fields[0].value === "Morte" ||
    fields[0].value === "Morte - Acidente Trabalho" ||
    fields[0].value === "Morte - Doenca Profissional";

  const certificateAskDemission =
    fields[0].value === "Inic.Empregado c/ Justa Causa" ||
    fields[0].value === "Inic.Empregado s/ Justa Causa";

  const changeFields = (values) => {
    upFields = [
      { name: ["rescissionCause"], value: values[0].value },
      { name: ["warningType"], value: values[1].value },
      { name: ["warningDate"], value: values[3].value },
      { name: ["dismissalDate"], value: values[4].value },
      { name: ["paymentDate"], value: values[5].value },
      { name: ["numDayWork"], value: values[6].value },
      { name: ["compSaturday"], value: values[7].value },
      { name: ["fufillWork"], value: values[8].value },
      { name: ["hiredOtherCompany"], value: values[9].value },
      { name: ["vacancyReplace"], value: values[11].value },
    ];
  };

  return (
    <>
      <fieldset>
        <legend>Informações da Rescisão</legend>
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 9 }}
          labelAlign="left"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            changeFields(allFields);
            setFields(upFields);
          }}
        >
          <Row gutter={30}>
            <Col span={12}>
              <Tooltip title="Selecione a causa de demissão">
                <Form.Item
                  name={["rescissionCause"]}
                  label={"Causa da Rescisão:"}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (certificateCauseDead) {
                          return Promise.resolve(
                            setTooltip("Favor anexar o atestado de óbito")
                          );
                        } else if (certificateAskDemission) {
                          return Promise.resolve(
                            setTooltip("Favor anexar a carta de demissão")
                          );
                        }
                        return;
                      },
                    }),
                    {
                      required: true,
                      message: "Obrigatório Selecionar tipo de aviso prévio.",
                    },
                  ]}
                  wrapperCol={{ span: 8 }}
                >
                  <Select placeholder="Selecione a Causa">
                    {arrayCausa.map((aviso, index) => {
                      return (
                        <Select.Option key={index} value={aviso}>
                          {aviso}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title="Selecionar o tipo de aviso prévio">
                <Form.Item
                  name={["warningType"]}
                  label={"Tipo do Aviso Prévio:"}
                  rules={[
                    {
                      required: true,
                      message: "Obrigatório Selecionar tipo de aviso prévio.",
                    },
                  ]}
                >
                  <Select placeholder="Tipo de Aviso prévio">
                    {TypeWarning.map((causa, index) => {
                      return (
                        <Select.Option key={index} value={causa}>
                          {causa}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={12}>
              <Tooltip title={tooltip}>
                <Form.Item
                  name={["attachDoc"]}
                  label={"Anexo:"}
                  hidden={
                    certificateCauseDead || certificateAskDemission
                      ? false
                      : true
                  }
                  rules={[
                    { required: true, message: "Obrigatório inserir o anexo." },
                  ]}
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Tooltip title="Informar a data de início do aviso prévio">
                <Form.Item
                  name={["warningDate"]}
                  label={"Data do Aviso Prévio: "}
                  rules={[
                    {
                      required: true,
                      message:
                        "Obrigatório informar a data de início do aviso prévio.",
                    },
                  ]}
                >
                  <DatePicker allowClear format="DD/MM/YYYY" />
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={12}>
              <Tooltip title="Informar a data da demissão">
                <Form.Item
                  name={["dismissalDate"]}
                  label={"Data de Demissão: "}
                  rules={[
                    {
                      required: true,
                      message: "Obrigatório informar a data de demissão.",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        const weekDay = value._d.getDay();

                        if (weekDay === 1 || weekDay === 3) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error(
                              "Escolher somente a segunda-feira ou quarta"
                            )
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <DatePicker allowClear format="DD/MM/YYYY" />
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={12}>
              <Form.Item name={["paymentDate"]} label={"Data de Pagamento: "}>
                <DatePicker allowClear format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={12}>
              <Tooltip title="Informar os dias trabalhados">
                <Form.Item
                  name={["numDayWork"]}
                  label={"Qtd Dias Trabalhado:"}
                  rules={[
                    {
                      required: true,
                      message: "Obrigatório informar os dias trabalhados.",
                    },
                  ]}
                  wrapperCol={{ span: 4 }}
                >
                  <Select
                    placeholder="Dias Trabalhado"
                    style={{ marginLeft: "90px" }}
                  >
                    {dias.map((day, index) => {
                      return (
                        <Select.Option key={index} value={day}>
                          {day}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          {/* Inicio dos switchs */}
          <div>
            <Row gutter={20}>
              <Col span={14}>
                <Tooltip title="Informar se o sábado será compensado">
                  <Form.Item
                    name={["compSaturday"]}
                    label={["Sábado compensado na semana?"]}
                  >
                    <Switch
                      unCheckedChildren="Não"
                      checkedChildren="Sim"
                    ></Switch>
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={14}>
                <Tooltip title="Informar se cumpriu a jornada semanal">
                  <Form.Item
                    name={["fufillWork"]}
                    label={["Cumpriu a jornada semanal?"]}
                  >
                    <Switch
                      unCheckedChildren="Não"
                      checkedChildren="Sim"
                    ></Switch>
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={14}>
                <Tooltip title="Se contratado por outra empresa tem a opção de anexar carta">
                  <Form.Item
                    name={["hiredOtherCompany"]}
                    label={["Funcionário contratado por outra empresa?"]}
                  >
                    <Switch
                      unCheckedChildren="Não"
                      checkedChildren="Sim"
                    ></Switch>
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Opcional para anexar a carta da outra outra empresa">
                  <Form.Item
                    name={["attachLetter"]}
                    label={"Anexo:"}
                    labelCol={{ span: 5 }}
                    hidden={!fields[8].value}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={14}>
                <Tooltip title="Informar se haverá reposição de vagas">
                  <Form.Item
                    name={["vacancyReplace"]}
                    label={["Haverá reposição de vaga?"]}
                  >
                    <Switch
                      unCheckedChildren="Não"
                      checkedChildren="Sim"
                    ></Switch>
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </Form>
      </fieldset>
    </>
  );
}
