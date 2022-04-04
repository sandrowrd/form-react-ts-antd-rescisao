import { Form, Row, Col, Switch, Input } from "antd";
import "../containersCommonFile/container.css";

export default function ContainerAnalyzeRH() {
  return (
    <>
      <fieldset>
        <legend>Análise RH Rescisão</legend>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 9 }}
          labelAlign="left"
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label={"Análise de Contrato de Trabalho?"}>
                <Switch unCheckedChildren="Não" checkedChildren="Sim"></Switch>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Kit Demissão Pronto?"}>
                <Switch unCheckedChildren="Não" checkedChildren="Sim"></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label={"Documento Docusign?"}>
                <Switch unCheckedChildren="Não" checkedChildren="Sim"></Switch>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item></Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label={"Link do Documento"}
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 10 }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                label={"Status Docusign"}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 6 }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}
