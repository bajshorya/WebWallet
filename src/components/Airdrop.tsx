import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const airdrop = async (address: string, amount: number) => {
  try {
    console.log("Starting airdrop...");
    const publicKey = new PublicKey(address);
    const conn = new Connection("http://localhost:8899", "confirmed");
    console.log("Connected to Solana test validator at http://127.0.0.1:8899");

    const signature = await conn.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    console.log("Airdrop requested. Signature:", signature);

    await conn.confirmTransaction(signature);
    console.log("Transaction confirmed.");
  } catch (error) {
    console.error("Error during airdrop:", error);
  }
};

// airdrop("2n8Ag84vZvxt1Vgxz2ipNsMjtNdWzBe6meDxB3ARWkib", 1);
