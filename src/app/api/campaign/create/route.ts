// import { writeDeliveryReport } from "@/modules/campaign/pages/create_delivery_report/blockchain/write-delivery-report";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const txHash = await writeDeliveryReport({
//       privateKey: process.env.POLYGON_PRIVATE_KEY as `0x${string}`,
//       contractAddress: process.env.POLYGON_CONTRACT as `0x${string}`,
//       abi,
//       reportId: body.reportId,
//       title: body.title,
//       note: body.note,
//       distributorId: body.userId,
//     });

//     return Response.json({ success: true, txHash });
//   } catch (err) {
//     console.error(err);
//     return Response.json(
//       { success: false, message: "Blockchain error", error: err },
//       { status: 500 }
//     );
//   }
// }
