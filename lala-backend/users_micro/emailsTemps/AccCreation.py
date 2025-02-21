def account_completion_email(names):
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LALA Rentals</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous" referrerpolicy="no-referrer">
</head>
<body style="background-color: #f4f8fb; font-family: Arial, sans-serif; padding: 10px;">
<div style="max-width: 640px; margin: 40px auto; background-color: #ffffff; padding: 24px; color: #4a5568; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);">
    <div style='width:100px;height:100px;overflow:hidden;margin:10px auto;border-radius:100px'>
        <img src="https://lh3.googleusercontent.com/a/ACg8ocIR4KsiBVVLyfW_yoH5Y5rUT3DsdcMHCPAHHlrTN0l3V6Aoaw=s288-c-no" style='height:100%'/>
    </div>
    <p style="font-size: 1.125rem; margin-bottom: 16px;">Hi {names},</p>
    <p style="margin-bottom: 16px;">Thank you for completing your account setup at Lala Rentals! 🎉</p>
    <p style="margin-bottom: 16px;">
        If you haven't verified your email address yet, please do so to ensure the security of your account. A review of your account will be conducted shortly. If any false information is detected, your account may be closed. For now, your account is open and ready for use.
    </p>
    <p style="margin-bottom: 16px;">
        If you have any questions or need assistance, feel free to reach out to us.
    </p>
    <p style="margin-bottom: 16px;">Regards,<br />The Lala rentals  Team</p>
    <hr style="margin-bottom: 16px;" />
    <p style="font-size: 0.75rem; margin-top: 12px; text-align: center;">
        You can visit our website via:
        <a href="https://www.lala-rentals.com/" style="color: #3182ce;">https://www.lala-rentals.com/</a>
    </p>
</div>
</body>
</html>
"""
