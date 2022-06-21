FROM quay.io/lyfe00011/test:beta
# FROM malsha
# FROM white shadow sl

RUN git clone https://github.com/whiteshadowofficial/meta-project-test.git /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
RUN yarn install --no-audit
RUN git clone https://github.com/AiDarkEzio/medias.git
RUN cp -R /root/Utils/* /root/WhatsAsenaDuplicated 
CMD ["node", "bot.js"]
