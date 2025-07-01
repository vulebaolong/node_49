/**
docker image build -t vulebaolong/img-be_cyber_community:latest .
docker build -t img-be_cyber_community .
   - build ra image

docker image list
   - xem danh sách các image

docker container list
docker container ls   
docker ps 
   - list ra tất cả các container đang được chạy
   - thêm tag -a (all) list ra tất cả các container bất kể đang chạy hay không chạy

docker image remove ten_id_image
   - xoá image

dive: là thư viện giúp phân tích image

docker run --env-file .env --name con-be_cyber_community -p 3070:3069 -d img-be_cyber_community
MYSQL: docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag


docker logs 644
   - xem log terminal của container

docker container remove id_ten_container
   - xoá container

docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_container
   - lấy địa chỉ IP: để 2 container giao tiếp với nhau

docker compose up -d
   - chạy docker compose

docker compose down 
   - xoá docker compose (2 service)

docker login

docker push vulebaolong/img-be_cyber_community:latest
   - lưu ý phải đày đủ các cấu hình
   - tên tài khoản docker: vulebaolong
   - tên image: img-be_cyber_community
   - tag version: latest

# x86 (chip intel): amd64
#     - docker build --platform=linux/amd64
#     - docker build --platform=linux/x86_64
# arm (chip apple): arm64
#     - docker build --platform=linux/arm64

 */
