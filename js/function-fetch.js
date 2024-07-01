export const BASEURL = 'http://127.0.0.1:5000';


export async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options);  // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
        return null; //Retorna null si ocurre un error
    }
}