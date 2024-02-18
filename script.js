function saveJSONToFile(jsonObject, filename) {
    filename = prompt("Please enter the filename", filename);

    if (!filename) {
        return;
    }

    filename += ".json";

    const jsonString = JSON.stringify(jsonObject);

    // Create a new Blob object with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a new anchor element
    const a = document.createElement('a');

    // Create a URL object from the Blob
    const url = URL.createObjectURL(blob);

    // Set the anchor's href attribute to the URL
    a.href = url;

    // Set the anchor's download attribute to the filename
    a.download = filename;

    // Programmatically click the anchor to trigger the download
    a.click();

    // Release the URL object to free up resources
    URL.revokeObjectURL(url);
}

function readJSONFile(callback) {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';

    // Listen for changes in the file input
    input.addEventListener('change', function () {
        // Get the selected file
        const file = input.files[0];

        // Create a new FileReader object
        const reader = new FileReader();

        // Define the onload event handler
        reader.onload = function () {
            try {
                // Parse the JSON content of the file
                const jsonData = JSON.parse(reader.result);

                // Call the callback function with the JSON data
                callback(jsonData);
            } catch (error) {
                // Handle any parsing errors
                console.error('Error parsing JSON file:', error);
            }
        };

        // Read the contents of the selected file as text
        reader.readAsText(file);
    });

    // Click the file input element programmatically to trigger the file selection dialog
    input.click();
}

function getCurrentDateTime() {
    const now = new Date();

    // Get the year, month, and day components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    // Get the hours, minutes, and seconds components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Assemble the datetime string in yyyy-mm-dd hh:mm:ss format
    const datetimeString = `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;

    return datetimeString;
}