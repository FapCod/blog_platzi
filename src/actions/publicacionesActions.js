import axios from "axios";
import {
  ACTUALIZAR,
  CARGANDO,
  ERROR,
  COM_CARGANDO,
  COM_ERROR,
  COM_ACTUALIZAR
} from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );

    const nuevas = respuesta.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));

    const publicacion_actualizadas = [...publicaciones, nuevas];
    dispatch({
      type: ACTUALIZAR,
      payload: publicacion_actualizadas
    });
    const publicaciones_key = publicacion_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "publicaciones no disponibles"
    });
  }
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
  console.log(pub_key, com_key);
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];
  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  };

  const publicacion_actualizadas = [...publicaciones];
  publicacion_actualizadas[pub_key] = [...publicaciones[pub_key]];
  publicacion_actualizadas[pub_key][com_key] = actualizada;
  dispatch({
    type: ACTUALIZAR,
    payload: publicacion_actualizadas
  });
};
export const traerComentarios = (pub_key, com_key) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: COM_CARGANDO
  });
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];
  try {
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
    );
    const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
    };
    const publicacion_actualizadas = [...publicaciones];
    publicacion_actualizadas[pub_key] = [...publicaciones[pub_key]];
    publicacion_actualizadas[pub_key][com_key] = actualizada;
    dispatch({
      type: COM_ACTUALIZAR,
      payload: publicacion_actualizadas
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COM_ERROR,
      payload: "Comentarios NO disponibles"
    });
  }
};
