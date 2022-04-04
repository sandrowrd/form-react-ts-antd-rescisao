import { Form, Table } from "antd";
import "../containersCommonFile/container.css";

export default function ContainerStability() {
  const data = [
    {
      key: 1,
      type: "Férias",
      dateBegin: "12/10/2021",
      dateEnd: "12/12/2021",
      description: "Féria marcada",
    },
  ];

  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "key",
      width: "20%",
    },
    {
      title: "Data Inicio",
      dataIndex: "dateBegin",
      key: "key",
      width: "20%",
    },
    {
      title: "Data Fim",
      dataIndex: "dateEnd",
      key: "key",
      width: "20%",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "key",
      width: "40%",
    },
  ];

  return (
    <>
      <fieldset>
        <legend>Estabilidades e Férias</legend>
        <Form>
          <Form.Item name={["history"]} labelAlign="left">
            <Table dataSource={data} columns={columns} bordered />
          </Form.Item>
        </Form>
      </fieldset>
    </>
  );
}
