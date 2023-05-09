
export default async function (req, res) {
  
    const response = await fetch('https://run.dingjunjie.com/v1/models', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': req.headers.authorization,
        },
    });
    return res.status(200).json(await response.json());
}
    
    