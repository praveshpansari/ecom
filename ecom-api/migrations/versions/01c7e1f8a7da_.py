"""empty message

Revision ID: 01c7e1f8a7da
Revises: 96ca866f42e4
Create Date: 2022-11-09 03:43:48.839300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01c7e1f8a7da'
down_revision = '96ca866f42e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'cart', ['user_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'cart', type_='unique')
    # ### end Alembic commands ###
