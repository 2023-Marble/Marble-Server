![github-title](https://github.com/2023-Marble/Marble-Server/assets/61882016/767380ee-7428-467a-b960-099e64dca0bd)

<br />

## 🔮 서비스 소개

> 다른 사람의 브이로그나 타입랩스에 내 얼굴이 찍혀서 불쾌했던 경험이 있나요?

**Marble**은 사전에 등록한 얼굴 이외의 다른 인물을 동영상에서 실시간, 자동으로 모자이크하는 서비스입니다.

Marble의 주요 기능은 다음과 같습니다.

1. 실시간 자동 모자이크
   - 동영상 촬영 중 실시간으로 얼굴을 인식해 모자이크 처리
2. 얼굴 사전 등록
   - 구글 소셜 로그인을 통해 모자이크하지 않을 얼굴 등록
3. 모자이크 옵션 설정
   - 기본 (모자이크)
   - 블러
   - 표정 마스킹 (웃는 얼굴 or 무표정)
   - 커스텀 스티커 (사용자가 업로드한 이미지 파일)

## 🔮 아키텍처

![Architecture](https://github.com/2023-Marble/Marble-Server/assets/61882016/842d1e2b-27cb-49c4-ae71-2bf0a6ceb3f8)

## 🔮 서비스 파이프라인

![파이프라인_얼굴등록](https://github.com/2023-Marble/Marble-Server/assets/61882016/fdd37406-c32d-46cd-a65a-31f7522e8d22)

![파이프라인_얼굴detection](https://github.com/2023-Marble/Marble-Server/assets/61882016/a5f92ff6-7ef0-4eef-ba87-d3913aa39614)

## 🔮 Running the app

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
