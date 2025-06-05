import axios from "axios";

const BASE_URL = process.env.REACT_APP_ROOT_URL || 'http://ec2-13-236-2-242.ap-southeast-2.compute.amazonaws.com:2800';


const invoke = ({ url, method = 'GET', headers, data, ...rest }) => axios({ baseURL: BASE_URL, url, method, headers, data, ...rest });

export default invoke;