import React, { useEffect, useState } from "react";
import Sidebar from "../../menus/SideBar";
import Navbar from "../../menus/Navbar";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import "./Dashboard.css";
import blogFetch from "../../../axios/config";

import { Button, IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../../styles/Style.css";

function Dashboard() {
  const [filter, setFilter] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
          }
        );
      }
    };

    getCurrentLocation();
  }, []);
  const getContactsFilter = async () => {
    try {
      let response = await blogFetch.get(`/contact/filter?search=${filter}`);
      let data = response.data;
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getContacts = async () => {
    try {
      let response = await blogFetch.get(`/contact`);
      let data = response.data;
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [markers, setMarkers] = useState([]);

  const addMarker = (lat, lng) => {
    setMarkers([...markers, { lat, lng }]);
  };
  const handleClearMarkers = () => {
    setMarkers([]); // Limpa a array de marcadores, removendo todos os marcadores do mapa
  };
  const CustomTable = ({ data }) => {
    return (
      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Rua</TableCell>
                <TableCell>Número</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>País</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() =>
                    addMarker(item.address.latitude, item.address.longitude)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.address.street}</TableCell>
                  <TableCell>{item.address.number}</TableCell>
                  <TableCell>{item.address.neighborhood}</TableCell>
                  <TableCell>{item.address.city}</TableCell>
                  <TableCell>{item.address.state}</TableCell>
                  <TableCell>{item.address.postalCode}</TableCell>
                  <TableCell>{item.address.country}</TableCell>
                  <TableCell>{item.address.latitude}</TableCell>
                  <TableCell>{item.address.longitude}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="app_body" style={{ padding: 0, top: 85 }}>
        <div className="dashboard_container">
          <div className="table_container">
            <TextField
              required
              id="outlined-basic-name"
              label="Pesquisa"
              variant="outlined"
              className="mt-2 mb-2"
              fullWidth
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) getContactsFilter();
              }}
            />{" "}
            <CustomTable data={contacts} />
          </div>

          <div className="map_container">
            <LoadScript googleMapsApiKey="AIzaSyA0Bl_lLmhuwfJCNFx2JqBqd6OVyQjuG6w">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100vh",
                }}
                center={currentLocation}
                zoom={13}
              >
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker} />
                ))}
              </GoogleMap>
            </LoadScript>
            <div style={{ position: "absolute", top: 13, right: 60 }}>
              {/* Botão para limpar os marcadores */}
              <Button variant="contained" onClick={handleClearMarkers}>
                Limpar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
