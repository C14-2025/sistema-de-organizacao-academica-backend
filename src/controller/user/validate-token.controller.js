export async function validateToken(req, res) {
  try {
    res.status(200).send(
      req._private.jwt,
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
