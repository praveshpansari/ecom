"""empty message

Revision ID: 4aba2b253e3c
Revises: 3356517a2b46
Create Date: 2022-11-08 19:23:50.330556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4aba2b253e3c'
down_revision = '3356517a2b46'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('brand',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('product', sa.Column('brand_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'product', 'brand', ['brand_id'], ['id'])
    op.drop_column('product', 'brand')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('brand', sa.VARCHAR(length=200), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'product', type_='foreignkey')
    op.drop_column('product', 'brand_id')
    op.drop_table('brand')
    # ### end Alembic commands ###
