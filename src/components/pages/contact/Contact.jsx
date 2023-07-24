import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../menus/SideBar";
import blogFetch from "../../../axios/config";
import LoadingButton from "@mui/lab/LoadingButton";
import Navbar from "../../menus/Navbar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import "../../styles/Style.css";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [contacts, setContacts] = useState({});
  const [filter, setFilter] = useState({});
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [ContactId, setContactId] = useState(0);
  const [loading, setLoading] = useState(false);

  const { useRef } = React;
  const ref = useRef();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      let response = await blogFetch.get(`/contact`);
      let data = response.data;
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getContactsFilter = async () => {
    try {
      let response = await blogFetch.get(`/contact/filter?search=${filter}`);
      let data = response.data;
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const modalAdd = () => {
    return (
      <Modal show={showModalAdd} onHide={() => setShowModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Bloco</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm ref={ref}></ContactForm>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalAdd(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                let isValid = await ref.current.addContact();
                setLoading(false);

                if (isValid !== false) {
                  setLoading(false);
                  setShowModalEdit(false);
                  getContacts();
                }
                
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Salvar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };

  const modalEdit = () => {
    return (
      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Bloco</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm ref={ref} id={ContactId}></ContactForm>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalEdit(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                let isValid = await ref.current.updateContact();
                setLoading(false);

                if (isValid !== false) {
                  setLoading(false);
                  setShowModalEdit(false);
                  getContacts();
                }
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Salvar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };

  const modalDelete = () => {
    return (
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar Contato</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente deletar o Contato?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalDelete(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                await blogFetch.delete(`/contact/${ContactId}`);
                setShowModalDelete(false);
                getContacts();
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Excluir
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app_body">
        <div className="header_tables_view">
          <div>
            <TextField
              required
              id="outlined-basic-name"
              label="Pesquisa"
              variant="outlined"
              fullWidth
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) getContactsFilter();
              }}
            />
          </div>
          <div>
            <h3 className="title_tables">Contatos</h3>
          </div>
          <div>
            <Button
              className="add_button"
              variant="contained"
              onClick={() => setShowModalAdd(true)}
            >
              Adicionar
            </Button>
          </div>
        </div>
        <table className="table table-hover">
          <thead className="table-header">
            <tr className="table_row">
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>CEP</th>
              <th>Cidade</th>

              <th className="edit">Editar</th>
              <th className="edit">Excluir</th>
            </tr>
          </thead>
          <tbody className="table_row">
            {!!contacts &&
              Object.entries(contacts).map((item) => (
                <tr key={item[1].id}>
                  <td>{item[1].id}</td>
                  <td>{item[1].name}</td>
                  <td>{item[1].cpf}</td>
                  <td>{item[1].phone}</td>
                  <td>{item[1].address.postalCode}</td>
                  <td>{item[1].address.city}</td>
                  <td className="edit">
                    <center>
                      <ModeEditIcon
                        onClick={() => {
                          setContactId(item[1].id);
                          setShowModalEdit(true);
                        }}
                      />
                    </center>
                  </td>
                  <td className="edit">
                    <center>
                      <DeleteIcon
                        onClick={() => {
                          setContactId(item[1].id);
                          setShowModalDelete(true);
                        }}
                      />
                    </center>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalAdd()}
      {modalEdit()}
      {modalDelete()}
    </>
  );
}
