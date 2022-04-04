import {
  Form,
  Row,
  Col,
  Table,
  Switch,
  Input,
  Button,
  Modal,
  InputNumber,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../containersCommonFile/container.css";
import { useState } from "react";

export default function ContainerRemuneration() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: "",
      type: "",
      descriptionBenef: "",
      amount: "",
      total: "",
    },
  ]);
  const [count, setCount] = useState(0);

  const ModalForm = () => {
    return (
      <Modal
        title="Informe um novo Item"
        visible={visible}
        okText="Adicionar"
        cancelText="Sair"
        onCancel={() => setVisible(false)}
        onOk={addItem}
      >
        <Form name="addItem" form={form}>
          <Form.Item name={"typeItem"} label={"Tipo"}>
            <Select>
              <Select.Option key={1} value="Proventos">
                Proventos
              </Select.Option>
              <Select.Option key={2} value="Vantagem">
                Vantagem
              </Select.Option>
              <Select.Option key={3} value="Descontos">
                Descontos
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"descriptItem"} label={"Descrição"}>
            <Input />
          </Form.Item>
          <Form.Item name={"amountItem"} label={"Quantidade"}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name={"totalItem"} label={"Total em Valor"}>
            <InputNumber addonBefore="R$" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  interface Item {
    key: string;
    type: string;
    descriptionBenef: string;
    amount: string;
    total: string;
  }

  const addItem = () => {
    form.submit();
  };

  const onDelete = (record, index) => {
    setDataSource((prev) => {
      return prev.filter((item) => item.key !== record.key);
    });
  };

  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Descrição",
      dataIndex: "descriptionBenef",
      key: "descriptionBenef",
      width: "40%",
    },
    {
      title: "Quantidade",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
    },
    {
      title: "Total em Valor",
      dataIndex: "total",
      key: "total",
      width: "20%",
    },
    {
      title: "Ação",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record, index) =>
        record.type ? (
          <a>
            <DeleteOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                onDelete(record, index);
              }}
            />
          </a>
        ) : (
          <a></a>
        ),
    },
  ];

  return (
    <>
      <fieldset>
        <legend>Verbas Remuneração</legend>
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === "addItem") {
              const newData: Item = {
                key: count.toString(),
                type: values.typeItem,
                descriptionBenef: values.descriptItem,
                amount: values.amountItem,
                total: values.totalItem,
              };

              setCount((num) => num + 1);

              setDataSource((prev) => {
                return [newData, ...prev];
              });
            }
          }}
        >
          <Form
            name="tableItem"
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 9 }}
            labelAlign="left"
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label={"Preenchido manualmente?"}>
                  <Switch
                    unCheckedChildren="Não"
                    checkedChildren="Sim"
                  ></Switch>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => setVisible(true)}
              >
                Novo Item
              </Button>
            </Row>
            <Row>
              <Col span={24}>
                <Table dataSource={dataSource} columns={columns} />
              </Col>
            </Row>
          </Form>
          <ModalForm />
        </Form.Provider>
      </fieldset>
    </>
  );
}
