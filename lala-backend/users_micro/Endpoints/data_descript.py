import jwt

SECRET_KEY_DATA = "NOVA_AID@2024#NOT_FOR_SHARING"
ALGORITHM_DATA = "HS256"

def decrypt_any_data(token: str) -> dict:
    try:
        decoded_data = jwt.decode(token, SECRET_KEY_DATA, algorithms=[ALGORITHM_DATA])

        encrypted_data = decoded_data.get("data", {})
        return encrypted_data
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return {}
    except jwt.InvalidTokenError:
        print("Invalid token")
        return {}

# Example usage
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY2Vzc190b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYm1GdFpTSTZJbk4wY21sdVp5SXNJbWxrSWpveExDSmhZMk5mZEhsd1pTSTZXeUp3WVhScFpXNTBJbDBzSW1WNGNDSTZNVGN5TmpJek9UazFNbjAuQmt6LVducXRHTmJ4VG5aQW1CM1QyMmxkOEFxM21HNU1WTnkyQkhwY2RhVSIsInRva2VuX3R5cGUiOiJiZWFyZXIiLCJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InN0cmluZyIsImVtYWlsIjoic2F1dmV1cmxvdWUyQG1haWwuY29tIiwiZm5hbWUiOiJzdHJpbmciLCJsbmFtZSI6InN0cmluZyIsInBob25lIjoiIiwiZ2VuZGVyIjoiIiwiY291bnRyeSI6IiIsImRvYiI6IjIwMjQtMDgtMTQiLCJOX2lkIjoiIiwiaWRfcHJvdmUiOiIiLCJmYXRoZXJfaWQiOiIiLCJmYXRoZXJfbmFtZSI6IiIsIm1vdGhlcl9pZCI6IiIsIm1vdGhlcl9uYW1lIjoiIiwiUGFyZW50X3N0YXR1cyI6ZmFsc2UsIlBhcmVudF9kaWVkIjpbXSwiZGlzYWJpbGl0aWVzIjpbXSwiZ3VkaWFuX25hbWUiOiIiLCJoZWlnaHQiOm51bGwsIndlaWdodCI6bnVsbCwibWFycmllZCI6ZmFsc2UsImlzX2NoaWxkIjp0cnVlLCJzcG91c2UiOiIiLCJhY2NfdHlwZSI6WyJwYXRpZW50Il0sImFjY19zdGF0dXMiOmZhbHNlLCJhdmF0YXIiOiIiLCJibG9vZF90eXBlIjoiIiwiZW1haWxfY29uZmlybSI6ZmFsc2UsImV4aXN0aW5nX21lZGljYWxfY29uZGl0aW9ucyI6IiIsImFsbGVyZ2llcyI6W10sInBoeXNpY2FsX2FjdGl2aXR5X2xldmVsIjoiIiwiZGlldGFyeV9wcmVmZXJlbmNlcyI6W10sInNtb2tpbmdfc3RhdHVzIjoiIiwiYWxjb2hvbF9jb25zdW1wdGlvbiI6IiIsInByaW1hcnlfaGVhbHRoX2dvYWwiOiIiLCJwcmVmZXJyZWRfd29ya291dF90eXBlcyI6W10sInByZWZlcnJlZF93b3Jrb3V0X3RpbWVzIjoiIiwiZW1lcmdlbmN5X2NvbnRhY3QiOiIiLCJlbWVyZ2VuY3lfY29udGFjdF9uYW1lIjoiIn19fQ.jj9R5jDzbNBu_HO410RHwGJcOLFlYc-V4YRB8WQg9MQ"
data = decrypt_any_data(token)
print(data)
