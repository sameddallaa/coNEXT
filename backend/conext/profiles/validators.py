from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from datetime import date
import re


def validate_username(username: str):
    pattern = re.compile(r"^[a-zA-Z0-9._]+$")
    if not pattern.match(username):
        raise ValidationError(
            "Username can only contain alphanumeric characters, underscores and periods."
        )


def validate_birthdate(birthdate: date):
    today = date.today()
    if birthdate > today:
        raise ValidationError("Birthdate cannot be in the future")
    thirteen_years_ago = today.replace(year=today.year - 13)
    if birthdate > thirteen_years_ago:
        raise ValidationError("User must be at least 13 years old")
