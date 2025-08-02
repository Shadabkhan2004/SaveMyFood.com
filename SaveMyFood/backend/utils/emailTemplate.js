function reminderTemplate(userName, itemName, daysLeft) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; padding:20px;">
    <h2 style="color:#2e7d32;">Hello ${userName || "User"},</h2>
    <p>⏰ Your pantry item <strong>${itemName}</strong> will expire in <strong>${daysLeft} day(s)</strong>.</p>
    
    <p style="margin-top:10px;">Make sure to use or remove it before it goes bad.</p>

    <a href="http://yourwebsite.com/pantry" 
       style="display:inline-block; margin-top:20px; padding:10px 20px; background:#2e7d32; color:white; text-decoration:none; border-radius:5px;">
      View My Pantry
    </a>

    <p style="margin-top:30px; font-size:12px; color:#777;">
      This is an automated reminder from Pantry Management App.
    </p>
  </div>
  `;
}

function expiredTemplate(userName, itemName) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; padding:20px;">
    <h2 style="color:#c62828;">Hello ${userName || "User"},</h2>
    <p>⚠️ Your pantry item <strong>${itemName}</strong> has expired.</p>
    
    <p style="margin-top:10px;">It has been removed from your pantry automatically to keep your list updated.</p>

    <a href="http://yourwebsite.com/pantry" 
       style="display:inline-block; margin-top:20px; padding:10px 20px; background:#c62828; color:white; text-decoration:none; border-radius:5px;">
      Check My Pantry
    </a>

    <p style="margin-top:30px; font-size:12px; color:#777;">
      This is an automated notification from Pantry Management App.
    </p>
  </div>
  `;
}

module.exports = { reminderTemplate, expiredTemplate };
