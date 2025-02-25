const PdfPrinter = require("pdfmake");
const fonts = {
    Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
    },
};

function generateReportPerMonth(response, transactions) {
  const body = [];
  let totalRevenue = 0;
  let totalExpense = 0;

  try {

    for (let transaction of transactions) {
        const formattedDate =  new Date(transaction.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

        const rows = [
            transaction.id,
            transaction.type,
            transaction.category,
            formattedDate,
            `R$ ${parseFloat(transaction.price).toFixed(2).replace(".", ",")}`
        ];

        body.push(rows);

        if(transaction.type === "RECEITA"){
            totalRevenue = totalRevenue + parseFloat(transaction.price);
        }else{
            totalExpense = totalExpense + parseFloat(transaction.price);
        }
    }

    const printer = new PdfPrinter(fonts);

    const headerTransactions = [
        {text: "Id", style: "ColumnsTitle"}, 
        {text: "Tipo", style: "ColumnsTitle"}, 
        {text: "Categoria   ", style: "ColumnsTitle"}, 
        {text: "Data", style: "ColumnsTitle"}, 
        {text: "Preço", style: "ColumnsTitle"}, 
    ];

    const headerTotalPrice = [
        {text: "TOTAL RECEITAS", style: "ColumnsTitle"}, 
        {text: "TOTAL DESPESAS", style: "ColumnsTitle"}, 
        {text: "VALOR TOTAL RESTANTE", style: "ColumnsTitle"}, 
    ];
        
    const total = (totalRevenue - totalExpense);

    
    const valuesTotalPrice = [
        { text: `R$ ${totalRevenue.toFixed(2).replace(".", ",")}` },
        { text: `R$ ${totalExpense.toFixed(2).replace(".", ",")}` },
        { text: `R$ ${total.toFixed(2).replace(".", ",")}` },
      ];
      

    const docDefinition = {
        defaultStyle: {
        font: "Helvetica",
        },
        content: [
            {
                text: "Relatorio Mensal de Transações", style: "header"
            },

            { 
                table: {
                    heights: function(row){
                        return 15;
                    },
                    body: [
                        headerTransactions, 
                        ...body,
                    ],
                    style: "tableStyle"
                },
            },
            {
                table: {
                    body: [
                        headerTotalPrice, 
                        valuesTotalPrice,
                    ],
                },
                margin: [0, 10, 0, 0],
            }
        ],
        styles:{
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center",
                margin: 20 
            },
            ColumnsTitle:{
                fontSize: 11,
                bold: true,
                margin: 2
            },
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const chunks = [];
    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        response.end(result);
    });
  } catch (error) {
   console.log(error);
   return response.status(500).json({message: "Erro no servidor"})
  }
 
}

module.exports = generateReportPerMonth;
