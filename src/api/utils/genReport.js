const PdfPrinter = require("pdfmake");

async function generateReportPerMonth(response, transactions) {
  const body = [];

  try {
    const fonts = {
        Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
        },
    };

    for (let transaction of transactions) {
        const rows = [];
        const date = new Date(transaction.date )
        const formatedDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

        rows.push(transaction.id);
        rows.push(transaction.type);
        rows.push(transaction.category);
        rows.push(formatedDate);
        rows.push(`R$ ${parseFloat(transaction.price).toFixed(2).replace(".", ",")}`);

        body.push(rows);
    }

    const printer = new PdfPrinter(fonts);
    const header = [
        {text: "Id", style: "ColumnsTitle"}, 
        {text: "Tipo", style: "ColumnsTitle"}, 
        {text: "Categoria   ", style: "ColumnsTitle"}, 
        {text: "Data", style: "ColumnsTitle"}, 
        {text: "Preço", style: "ColumnsTitle"}, 

    ];

    //TODO Adicionar total de despesas, receitas e total geral (receitas - despesas)
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
                body: [header, ...body],
                },
            },
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
            }
            
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
