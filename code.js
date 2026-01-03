//change file extension to gs when added
function processOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Etsy Orders");
  var data = sheet.getDataRange().getValues();

  var outputFolder;
  try {
    outputFolder = getFolderByNameSafe("CG-OUT");
  } catch (e) {
    SpreadsheetApp.getUi().alert(e.message);
    return;
  }

  var errorSheet = ss.getSheetByName("Errors");
  if (!errorSheet) errorSheet = ss.insertSheet("Errors");

  for (var i = 1; i < data.length; i++) {
    Logger.log("Processing row " + (i + 1));

    var orderId = data[i][0];
    var title = data[i][1];
    var size = data[i][2];
    var personalization = data[i][4];
    var status = data[i][6];

    if (status === "Done") continue;

    var prefix = "";
    var folderName = "";

    if (personalization === "Standard") {
      prefix = "V99"; folderName = "a-others";
    } else if (personalization === "Blueprint") {
      prefix = "B99"; folderName = "b-blueprints";
    } else if (personalization === "Framed") {
      prefix = "F99"; folderName = "a-others";
    } else if (personalization === "Custom Text") {
      prefix = "C99"; folderName = "b-blueprints";
    } else {
      sheet.getRange(i + 1, 7).setValue("Unknown Type");
      continue;
    }

    var cleanTitle = title.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
    var sku = prefix + "_" + cleanTitle + "_" + size;
    sheet.getRange(i + 1, 6).setValue(sku);

    var sourceFolder;
    try {
      sourceFolder = getFolderByNameSafe(folderName);
    } catch (e) {
      sheet.getRange(i + 1, 7).setValue("Folder Missing");
      continue;
    }

    var files = sourceFolder.getFilesByName(sku + ".jpg");

    if (files.hasNext()) {
      files.next().makeCopy(sku + ".jpg", outputFolder);
      sheet.getRange(i + 1, 7).setValue("Done");
    } else {
      sheet.getRange(i + 1, 7).setValue("File Missing");
      errorSheet.appendRow([new Date(), orderId, sku, "File Missing"]);
    }
  }
}

function getFolderByNameSafe(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (!folders.hasNext()) {
    throw new Error("Folder not found: " + name);
  }
  return folders.next();
}
