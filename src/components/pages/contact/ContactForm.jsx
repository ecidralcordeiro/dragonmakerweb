import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import blogFetch from "../../../axios/config";
import { isValidCPF } from "../../../utils/DataUtils";
import { Button, IconButton } from "@mui/material";
const { forwardRef, useImperativeHandle } = React;

export default forwardRef((props, ref) => {
  const [description, setDescription] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    getContacts();
  }, []);

  useImperativeHandle(ref, () => ({
    addContact,
    updateContact,
  }));

  const getContacts = async () => {
    if (props.id !== null && props.id !== undefined) {
      setLoading(true);
      try {
        let response = await blogFetch.get(`/contact/${props.id}`);
        let data = response.data;

        setName(data.name);
        setCpf(data.cpf);
        setPhone(data.phone);
        setAddressId(data.address.id);
        setStreet(data.address.street);
        setNumber(data.address.number);
        setNeighborhood(data.address.neighborhood);
        setCity(data.address.city);
        setState(data.address.state);
        setPostalCode(data.address.postalCode);
        setCountry(data.address.country);
        setLatitude(data.address.latitude.toString());
        setLongitude(data.address.longitude.toString());

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const addContact = async () => {
    let address = {
      street: street,
      number: number,
      neighborhood: neighborhood,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      const addressResponse = await blogFetch.post("/address", address);


      let contact = {
        name: name,
        cpf: cpf,
        phone: phone,
        address: {
          id: addressResponse.data,
        },
      };

      const contactResponse = await blogFetch.post("/contact", contact);
      console.log(contactResponse.status);
      return contactResponse.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateContact = async () => {
    let address = {
        street: street,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        latitude: latitude,
        longitude: longitude,
      };
  
      try {
        const addressResponse = await blogFetch.put("/address/"+ addressId , address);
        let contact = {
          name: name,
          cpf: cpf,
          phone: phone,
          address: {
            id: addressId,
          },
        };
  
        const contactResponse = await blogFetch.put("/contact/"+ props.id, contact);
        console.log(contactResponse.status);
        return contactResponse.status;
      } catch (error) {
        console.error(error);
        return null;
      }
  };

  return (
    <>
      {loading ? (
        <center>
          <div className="loading-container">
            <FontAwesomeIcon spin />
          </div>
        </center>
      ) : (
        <>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-name"
              label="Nome"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-cpf"
              label="CPF"
              variant="outlined"
              fullWidth
              value={cpf}
              onChange={(e) => {setCpf(e.target.value);
                console.log(isValidCPF(e.target.value))}}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-phone"
              label="telefone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-state"
              label="Estado"
              variant="outlined"
              fullWidth
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-city"
              label="Cidade"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-neighborhood"
              label="Bairro"
              variant="outlined"
              fullWidth
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-street"
              label="Rua"
              variant="outlined"
              fullWidth
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-number"
              label="Numero"
              variant="outlined"
              fullWidth
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-postal-code"
              label="CEP"
              variant="outlined"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-country"
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-latitude"
              label="Latitude"
              variant="outlined"
              fullWidth
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic-longitude"
              label="Longitude"
              variant="outlined"
              fullWidth
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </>
      )}
    </>
  );
});
