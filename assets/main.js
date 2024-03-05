(function () {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '200px' });
  })();

/*
function JebbyNoteField(class_name, title, field_id) {
  this.class_name = class_name;
  this.title = title;
  this.field_id = field_id;
  this.contenteditable = false;
  this.type = textarea;
  this.content = client.get(`ticket.customField:custom_field_${field_id}`);

  this.getCurrentNotes = function() {
    this.content = client.get(`ticket.customField:custom_field_${field_id}`);
  }
  this.makeEditable = function() {
    contenteditable = true;
  }
  this.makeUneditable = function() {
    contenteditable = false;
  }

  fieldContent = `
  <div class="noteField">
    <div class="displayText>${this.content}</div>
    <button type="button" class="btn btn-primary cancel-button" id="cancelButton">Cancel</button>
    <button type="button" class="btn btn-primary done-button" id="doneButton">Done</button>
  </div>
  `

  const elementNode   = document.createElement("div");
  const textNode      = document.createTextNode(this.title);
  const attributeNode = document.createAttribute('class');

  elementNode.appendChild(textNode);
  attributeNode.value = this.class_name;
  elementNode.setAttributeNode(attributeNode);
  document.body.appendChild(elementNode);
}


let keyDetails      = new JebbyNoteField("key_details", "Key Details", 14335318840215);
let tldr            = new JebbyNoteField("tldr", "TLDR", 13318940738711);
let symptoms        = new JebbyNoteField("symptoms", "Symptoms", 13515577514647);
let troubleshooting = new JebbyNoteField("troubleshooting", "Troubleshooting", 13515554689559);
*/

/* AI Code Below */

$(document).ready(function() {
  // Define custom field names and IDs
  var customFields = [
      {title: "Key Details", customFieldId: "14335318840215"},
      {title: "TLDR", customFieldId: "13318940738711"},
      {title: "Symptoms", customFieldId: "13515577514647"},
      {title: "Troubleshooting", customFieldId: "13515554689559"}
  ];

  // Iterate over each custom field and create elements
  customFields.forEach(function(field) {
      var $fieldContainer = $('<div>').addClass('field-container');
      var $fieldTitle = $('<h3>').text(field.title);
      var $fieldText = $('<div>').addClass('field-text');
      var $editButton = $('<button>').text('Edit').addClass('edit-btn');
      var $cancelButton = $('<button>').text('Cancel').addClass('cancel-btn').hide();
      var $doneButton = $('<button>').text('Done').addClass('done-btn').hide();

      // Append elements to container
      $fieldContainer.append($fieldTitle, $fieldText, $editButton, $cancelButton, $doneButton);
      $('#app-container').append($fieldContainer);

      // Fetch initial value from Zendesk custom field and display
      fetchAndUpdateCustomFieldValue(field.customFieldId, $fieldText);

      // Edit button click event
      $editButton.click(function() {
          $fieldText.attr('contenteditable', 'true').focus();
          $editButton.hide();
          $cancelButton.show();
          $doneButton.show();
      });

      // Cancel button click event
      $cancelButton.click(function() {
          $fieldText.attr('contenteditable', 'false');
          $cancelButton.hide();
          $doneButton.hide();
          $editButton.show();
          // Reset text to original value
          fetchAndUpdateCustomFieldValue(field.customFieldId, $fieldText);
      });

      // Done button click event
      $doneButton.click(function() {
          var newValue = $fieldText.text();
          // Update custom field value
          updateCustomFieldValue(field.customFieldId, newValue);
          $fieldText.attr('contenteditable', 'false');
          $cancelButton.hide();
          $doneButton.hide();
          $editButton.show();
      });
  });

  // Function to fetch and update custom field value
  function fetchAndUpdateCustomFieldValue(customFieldId, $fieldText) {
      // Simulated function to fetch value from Zendesk (replace with actual Zendesk API call)
      client.get('ticket.customField:' + customFieldId).then(function(data) {
        var customFieldValue = data['ticket.customField:' + customFieldId];
      // Update field text
      $fieldText.text(customFieldValue);
      });
  }

  // Function to update custom field value
  function updateCustomFieldValue(customFieldId, newValue) {
      // Simulated function to update value in Zendesk (replace with actual Zendesk API call)
      console.log("Updating custom field", customFieldId, "with value", newValue);
  }
});