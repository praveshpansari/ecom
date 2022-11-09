FROM python:3.8.15-slim-bullseye

WORKDIR /app

COPY ./requirements.txt ./

RUN pip3 install -r requirements.txt

COPY ./ /app/

CMD [ "sh", "-c","flask db upgrade \
    && python data.py \
    && python -m flask run --host=0.0.0.0" ]



