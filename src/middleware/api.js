/**
 * THIS FILE IS A WIP, IGNORE IT FOR NOW BUT WE WILL RETURN TO IT.
 */

import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:3000/api/v1/';

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
    ? API_ROOT + endpoint
    : endpoint;

  return fetch(fullUrl)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return {
        ...normalize(camelizedJson, schema)
      };
    });
}


const surveySchema = new Schema('surveys', {
  idAttribute: 'id'
});

surveySchema.define({

});
