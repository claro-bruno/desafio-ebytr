import RequestError from './RequestError';

const getAxiosResponse = async (callback) => {
  try {
    const { data } = await callback();
    return data;
  } catch (e) {
    const connectionFailedStatus = 521;
    let message = 'fail to connect';
    let status = connectionFailedStatus;
    let statusText = 'web server is down';

    if (e.response) {
      message = e.response.data.message;
      status = e.response.status;
      statusText = e.response.statusText;
    }

    const error = new RequestError({ message, status, statusText });

    return error;
  }
};

export default getAxiosResponse;
